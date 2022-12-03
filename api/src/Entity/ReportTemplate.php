<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\State\ReportTemplateStateProcessor;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => [
        'baseReport:item:read',
        "reportTemplate:item:read",
        'timestampable',
        'sortable',
        'id',
    ],
    ],
    denormalizationContext: ['groups' => [
        'baseReport:item:write',
        'reportTemplate:item:write',
        'sortable',
    ],
    ],
)]
#[GetCollection(
    normalizationContext: ['groups' => [
        'baseReport:list',
        'timestampable',
        'id',
    ],
    ],
)]
#[Post(processor: ReportTemplateStateProcessor::class)]
#[Get()]
#[Put(processor: ReportTemplateStateProcessor::class)]
#[Delete()]
#[Entity]
class ReportTemplate extends BaseReport
{
    #[Column(type: 'string', length: 255, nullable: false)]
    #[Assert\Length(min: 2, max: 255)]
    #[Groups(['reportTemplate:item:read', 'reportTemplate:item:write'])]
    private string $description;

    #[Column(type: 'string', length: 255, nullable: false)]
    #[Assert\Length(min: 2, max: 255)]
    #[Groups(['reportTemplate:item:read', 'reportTemplate:item:write'])]
    private string $supportingText;

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getSupportingText(): string
    {
        return $this->supportingText;
    }

    public function setSupportingText(string $supportingText): void
    {
        $this->supportingText = $supportingText;
    }
}
