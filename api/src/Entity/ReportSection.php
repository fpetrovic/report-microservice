<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Entity\Trait\IdTrait;
use App\Entity\Trait\SoftDeletableProperties;
use App\Entity\Trait\Sortable;
use App\Entity\Trait\TimestampableProperties;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToMany;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new GetCollection(openapi: false),
    ],
)]
#[Get()]
#[Post()]
#[Put()]
#[Delete()]
#[Entity]
class ReportSection
{
    use IdTrait;
    use Sortable;
    use TimestampableProperties;
    use SoftDeletableProperties;

    #[Column(type: 'string', length: 255, nullable: false)]
    #[Groups(['baseReport:item:read', 'baseReport:item:write'])]
    #[Assert\Length(min: 2, max: 255)]
    private string $name;

    #[ManyToOne(targetEntity: BaseReport::class, inversedBy: 'sections')]
    #[JoinColumn(name: 'report_id', referencedColumnName: 'id')]
    private BaseReport $report;

    /**
     * @var Collection<int, ReportField>
     * */
    #[OneToMany(mappedBy: 'section', targetEntity: ReportField::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups(['baseReport:item:read', 'reportTemplate:item:write'])]
    #[Assert\Valid]
    private Collection $reportFields;

    public function __construct()
    {
        $this->reportFields = new ArrayCollection();
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getReport(): BaseReport
    {
        return $this->report;
    }

    public function setReport(BaseReport $report): void
    {
        $this->report = $report;
    }

    public function getReportFields(): Collection
    {
        return $this->reportFields;
    }

    public function setReportFields(Collection $reportFields): void
    {
        $this->reportFields = $reportFields;
    }

    public function addReportField(ReportField $reportField): self
    {
        $reportField->setSection($this);
        $this->reportFields->add($reportField);

        return $this;
    }

    public function removeReportField(ReportField $reportField): self
    {
        $this->reportFields->removeElement($reportField);

        return $this;
    }
}
