<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\InverseJoinColumn;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\JoinTable;
use Doctrine\ORM\Mapping\ManyToMany;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(openapi: false),
    ],
)]
#[GetCollection()]
#[Get()]
#[Post()]
#[Put()]
#[Entity]
class ReportFilterField extends ReportField
{
    #[Column(type: 'json', nullable: true)]
    #[Groups(['baseReport:item:read', 'baseReport:item:write'])]
    private array $filter;

    #[JoinTable(name: 'report_field_record')]
    #[JoinColumn(name: 'report_filter_field_id', referencedColumnName: 'id')]
    #[InverseJoinColumn(name: 'record_id', referencedColumnName: 'id')]
    #[ManyToMany(targetEntity: Record::class)]
    #[Groups(['baseReport:item:read'])]
    #[ApiProperty(writableLink: false)]
    private Collection $records;

    #[JoinTable(name: 'report_field_record_exclusion')]
    #[JoinColumn(name: 'report_filter_field_id', referencedColumnName: 'id')]
    #[InverseJoinColumn(name: 'record_id', referencedColumnName: 'id')]
    #[ManyToMany(targetEntity: Record::class)]
    #[Groups(['baseReport:item:read', 'baseReport:item:write'])]
    #[ApiProperty(readableLink: false, writableLink: true)]
    /**
     * @var Collection<int, Record> $recordExclusions
     * */
    private Collection $recordExclusions;

    public function __construct()
    {
        $this->records = new ArrayCollection();
        $this->recordExclusions = new ArrayCollection();
    }

    public function getFilter(): array
    {
        return $this->filter;
    }

    public function setFilter(array $filter): void
    {
        $this->filter = $filter;
    }

    /**
     * @return Collection<int, Record>
     */
    public function getRecords(): Collection
    {
        return $this->records;
    }

    public function addRecord(Record $record): void
    {
        if (!$this->records->contains($record)) {
            $this->records->add($record);
        }
    }

    public function removeRecord(Record $record): void
    {
        if ($this->records->contains($record)) {
            $this->records->removeElement($record);
        }
    }

    /**
     * @return Collection<int, Record>
     */
    public function getRecordExclusions(): Collection
    {
        return $this->recordExclusions;
    }

    public function addRecordExclusion(Record $record): void
    {
        if (!$this->recordExclusions->contains($record)) {
            $this->recordExclusions->add($record);
        }
    }

    public function removeRecordExclusion(Record $record): void
    {
        if ($this->recordExclusions->contains($record)) {
            $this->recordExclusions->removeElement($record);
        }
    }
}
