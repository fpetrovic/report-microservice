<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Entity\Trait\IdTrait;
use App\Entity\Trait\SoftDeletableProperties;
use App\Entity\Trait\Sortable;
use App\Entity\Trait\TimestampableProperties;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\DiscriminatorColumn;
use Doctrine\ORM\Mapping\DiscriminatorMap;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\InheritanceType;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

// @todo rename basicReportField to reportBasicField
#[ApiResource(
    normalizationContext: ['groups' => ['reportField:item:read', 'sortable', 'id']],
    denormalizationContext: ['groups' => ['reportField:item:write', 'sortable', 'id']],
)]
#[GetCollection()]
#[Get()]
#[Entity]
#[InheritanceType('SINGLE_TABLE')]
#[DiscriminatorColumn(name: 'entity_type', type: 'string')]
#[DiscriminatorMap(
    [
        'reportBasicField' => 'ReportBasicField',
        'reportFilterField' => 'ReportFilterField',
        'reportSelectableField' => 'ReportSelectableField',
        'reportFileField' => 'ReportFileField',
    ]
)]
class ReportField
{
    use IdTrait;
    use TimestampableProperties;
    use SoftDeletableProperties;
    use Sortable;

    /* @todo make this field unique in combination with section id */ // I would need report id if it is on report level
    #[Column(type: 'string', length: 255, nullable: false)]
    #[Groups(['reportField:item:read', 'reportField:item:write', 'reportTemplate:item:read', 'reportTemplate:item:write'])]
    #[Assert\Length(min: 2, max: 255)]
    private string $name;

    // this field should be enum at least assert should be enum
    #[Column(type: 'string', length: 255, nullable: false)]
    #[Groups(['reportField:item:read', 'reportField:item:write', 'reportTemplate:item:read', 'reportTemplate:item:write'])]
    private string $reportFieldType;

    #[ManyToOne(targetEntity: ReportSection::class, inversedBy: 'reportFields')]
    #[JoinColumn(name: 'section_id', referencedColumnName: 'id')]
    private ReportSection $section;

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getReportFieldType(): string
    {
        return $this->reportFieldType;
    }

    public function setReportFieldType(string $reportFieldType): void
    {
        $this->reportFieldType = $reportFieldType;
    }

    public function getSection(): ReportSection
    {
        return $this->section;
    }

    public function setSection(ReportSection $section): void
    {
        $this->section = $section;
    }
}
